package agile.central.util;

import agile.central.aspects.*;
import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.repository.*;
import agile.central.util.Encryptor.*;
import lombok.*;
import org.bouncycastle.jcajce.provider.digest.*;
import org.bouncycastle.util.encoders.*;
import org.bouncycastle.util.encoders.Base64;

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Storage {

    private final String ticket;
    private final String filename;
    private final String attachmentFolder;
    private final String encryptionKey;
    private final FileRepository fileRepository;

    public Storage(String ticket, String filename, String attachmentFolder, String encryptionKey, FileRepository fileRepository) {

        this.ticket = ticket;
        this.filename = filename;
        this.attachmentFolder = attachmentFolder;
        this.encryptionKey = encryptionKey;
        this.fileRepository = fileRepository;
    }

    @Log
    public void uploadAttachment(byte[] file) throws IOException {

        String encodedFilename = Base64.toBase64String(filename.getBytes());

        Path attachmentPath = Path.of(attachmentFolder, "/", encodedFilename);

        try(OutputStream os = Files.newOutputStream(attachmentPath))
        {
            initStorageFolder();

            Encryptor encryptor = new Encryptor(encryptionKey);

            byte[] encryptedData = encryptor.doOperation(file, EncryptorMode.ENCRYPT);

            os.write(encryptedData);

            storeFilepathHash(attachmentPath, encodedFilename);
        }
    }

    @Log
    public byte[] downloadAttachment() throws IOException, StorageException {

        String hashedTicket = hashTicketName();

        String encodedFilename = Base64.toBase64String(filename.getBytes());

        FileDao file = fileRepository.get(hashedTicket, encodedFilename);

        if (file != null) {

            String encodedPath = file.getPath();

            String attachmentPath = Arrays.toString(Base64.decode(encodedPath));

            byte[] encryptedData = Files.readAllBytes(Path.of(attachmentPath));

            Encryptor encryptor = new Encryptor(encryptionKey);

            return encryptor.doOperation(encryptedData, EncryptorMode.DECRYPT);

        } else
            throw new StorageException("Selected file does not exist!");
    }

    @Log
    private void storeFilepathHash(Path path, String filename) throws FileAlreadyExistsException {

        String pathAsString = path.toString();

        String encodedPath = Base64.toBase64String(pathAsString.getBytes());

        FileDao file = new FileDao(filename, encodedPath);

        String hashed = hashTicketName();

        FileDao fileDao = fileRepository.get(hashed, filename);

        if (fileDao != null)
            throw new FileAlreadyExistsException("File already exists in database!");

        fileRepository.save(file, hashed);
    }

    @Log
    private String hashTicketName() {

        Keccak.Digest256 digest256 = new Keccak.Digest256();

        byte[] hashbytes = digest256.digest(ticket.getBytes(StandardCharsets.UTF_8));

        return Arrays.toString(Hex.encode(hashbytes));
    }

    @Log
    @SneakyThrows
    private void initStorageFolder() {

        Path attachmentPath = Path.of(attachmentFolder);

        if (!attachmentPath.toFile().exists())
            Files.createDirectory(attachmentPath);

        if (!attachmentPath.toFile().isDirectory())
            throw new StorageException("Provided path doesn't point to directory. It's a file!");
    }
}
