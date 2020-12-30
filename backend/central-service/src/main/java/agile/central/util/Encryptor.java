package agile.central.util;

import agile.central.aspects.*;
import lombok.*;
import org.bouncycastle.openssl.*;
import org.bouncycastle.util.encoders.*;

import javax.crypto.*;
import javax.crypto.spec.*;

import static agile.central.util.CentralConstants.AES_ALGORITHM;

public class Encryptor {

    private final byte[] encryptionKey;

    public enum EncryptorMode { ENCRYPT, DECRYPT }

    public Encryptor(String encryptionKey) {
        this.encryptionKey = Hex.decode(encryptionKey);
    }


    @Log
    @SneakyThrows
    public byte[] doOperation(byte[] data, EncryptorMode mode) {

        byte[] decodedKey = Base64.decode(encryptionKey);

        SecretKey secretKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, AES_ALGORITHM);

        Cipher cipher = Cipher.getInstance(AES_ALGORITHM);

        if (EncryptorMode.ENCRYPT.equals(mode)) {

            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            return cipher.doFinal(data);
        }
        else if (EncryptorMode.DECRYPT.equals(mode)) {

            cipher.init(Cipher.DECRYPT_MODE, secretKey);

            return cipher.doFinal(data);
        } else
            throw new EncryptionException("Invalid encryptor mode!");
    }
}
