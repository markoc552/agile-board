package agile.central.util;

import agile.central.aspects.*;
import agile.central.exceptions.*;
import lombok.*;
import org.bouncycastle.openssl.*;
import org.bouncycastle.util.encoders.*;

import javax.annotation.*;
import javax.crypto.*;
import javax.crypto.spec.*;

import java.io.*;
import java.nio.charset.*;
import java.security.*;

import static agile.central.util.CentralConstants.AES_ALGORITHM;

public class Encryptor {

    private final byte[] encryptionKey;
    private MessageDigest sha;

    public enum EncryptorMode { ENCRYPT, DECRYPT }


    public Encryptor(String encryptionKey) throws StorageException {

        initMessageDigest();

        this.encryptionKey = Base64.decode(encryptionKey);
    }

    //singleton
    public void initMessageDigest() throws StorageException {

        try
        {
            if (sha == null)
                sha = MessageDigest.getInstance("SHA-1");

        } catch (NoSuchAlgorithmException e) {

            throw new StorageException(e.getMessage());
        }
    }


    @Log
    @SneakyThrows
    public byte[] doOperation(byte[] data, EncryptorMode mode) {

        SecretKey secretKey = new SecretKeySpec(encryptionKey, "AES");

        Cipher cipher = Cipher.getInstance(AES_ALGORITHM);

        if (EncryptorMode.ENCRYPT.equals(mode)) {

            cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(new byte[16]));

            return cipher.doFinal(data);
        }
        else if (EncryptorMode.DECRYPT.equals(mode)) {

            cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(new byte[16]));

            return cipher.doFinal(data);
        } else
            throw new EncryptionException("Invalid encryptor mode!");
    }
}
