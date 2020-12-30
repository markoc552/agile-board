package agile.central.services;


import agile.central.aspects.*;
import agile.central.config.*;
import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.repository.*;
import agile.central.util.*;
import agile.central.util.Encryptor.*;
import lombok.*;
import org.bouncycastle.util.encoders.Base64;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@Service
public class AttachmentService {

    @Autowired
    private FileHashRepository fileHashRepository;

    @Autowired
    private ApplicationProperties applicationProperties;


    @Log
    public void uploadAttachment(byte[] file, String fileName) throws IOException {

        String encodedFilename = Base64.toBase64String(fileName.getBytes());

        Path attachmentPath = Path.of(applicationProperties.getAttachmentFolder(), "/", encodedFilename);

        try(OutputStream os = Files.newOutputStream(attachmentPath))
        {
            initStorageFolder();

            Encryptor encryptor = new Encryptor(applicationProperties.getEncryptionKey());

            byte[] encryptedData = encryptor.doOperation(file, EncryptorMode.ENCRYPT);

            os.write(encryptedData);

            storeFilepathHash(attachmentPath, encodedFilename);
        }
    }

    @Log
    public byte[] downloadAttachment(String fileName) throws StorageException, IOException {

        String encodedFilename = Base64.toBase64String(fileName.getBytes());

        Optional<FileHashDao> byFilename = fileHashRepository.findByFilename(encodedFilename);

        if (byFilename.isPresent()) {

            FileHashDao fileHashDao = byFilename.get();

            String encodedPath = fileHashDao.getPath();

            String attachmentPath = Arrays.toString(Base64.decode(encodedPath));

            byte[] encryptedData = Files.readAllBytes(Path.of(attachmentPath));

            Encryptor encryptor = new Encryptor(applicationProperties.getEncryptionKey());

            return encryptor.doOperation(encryptedData, EncryptorMode.DECRYPT);

        } else
            throw new StorageException("Selected file does not exist!");
    }

    @Log
    private void storeFilepathHash(Path path, String filename) {

        String pathAsString = path.toString();

        String encodedPath = Base64.toBase64String(pathAsString.getBytes());

        FileHashDao fileHash = new FileHashDao();
        fileHash.setFilename(filename);
        fileHash.setPath(encodedPath);

        fileHashRepository.save(fileHash);
    }

    @Log
    @SneakyThrows
    private void initStorageFolder() {

        Path attachmentFolder = Path.of(applicationProperties.getAttachmentFolder());

        if (!attachmentFolder.toFile().exists())
            Files.createDirectory(attachmentFolder);

        if (!attachmentFolder.toFile().isDirectory())
            throw new StorageException("Provided path doesn't point to directory. It's a file!");
    }
}
