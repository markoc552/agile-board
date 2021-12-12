package agile.central.util;

import agile.central.repository.*;
import lombok.*;

@NoArgsConstructor
public class StorageBuilder {

    private String ticket;
    private String filename;
    private String attachmentFolder;
    private String encryptionKey;
    private AttachmentRepository attachmentRepository;

    public StorageBuilder withTicket(String ticket) {

        this.ticket = ticket;

        return this;
    }

    public StorageBuilder withFilename(String filename) {

        this.filename = filename;

        return this;
    }

    public StorageBuilder withAttachmentFolder(String attachmentFolder) {

        this.attachmentFolder = attachmentFolder;

        return this;
    }

    public StorageBuilder withEncryptionKey(String encryptionKey) {

        this.encryptionKey = encryptionKey;

        return this;
    }

    public StorageBuilder withAttachmentRepository(AttachmentRepository attachmentRepository) {

        this.attachmentRepository = attachmentRepository;

        return this;
    }

    public Storage build() {

        return new Storage(ticket, filename, attachmentFolder, encryptionKey, attachmentRepository);
    }
}
