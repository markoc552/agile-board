package agile.central.services;


import agile.central.aspects.*;
import agile.central.config.*;
import agile.central.repository.*;
import agile.central.util.*;
import lombok.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class AttachmentService {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    ApplicationProperties applicationProperties;


    @SneakyThrows
    @Log
    public void uploadAttachment(byte[] file, String fileName, String ticket) {

        StorageBuilder builder = new StorageBuilder();

        Storage storage = builder.withTicket(ticket)
                                 .withAttachmentFolder(applicationProperties.getAttachmentFolder())
                                 .withEncryptionKey(applicationProperties.getEncryptionKey())
                                 .withFilename(fileName)
                                 .withFileRepository(fileRepository)
                                 .build();

        storage.uploadAttachment(file);
    }

    @SneakyThrows
    @Log
    public byte[] downloadAttachment(String fileName, String ticket) {

        StorageBuilder builder = new StorageBuilder();

        Storage storage = builder.withTicket(ticket)
                                 .withAttachmentFolder(applicationProperties.getAttachmentFolder())
                                 .withEncryptionKey(applicationProperties.getEncryptionKey())
                                 .withFilename(fileName)
                                 .withFileRepository(fileRepository)
                                 .build();

        return storage.downloadAttachment();
    }
}
