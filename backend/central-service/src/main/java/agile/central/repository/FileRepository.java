package agile.central.repository;

import agile.central.aspects.*;
import agile.central.model.dao.*;
import org.slf4j.*;
import org.springframework.data.redis.core.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
@Component
public class FileRepository {

    private final HashOperations<String, String, FileDao> hashOperations;

    public static final Logger LOG = LoggerFactory.getLogger(FileRepository.class);

    public FileRepository(RedisTemplate redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }

    @Log
    public void save(FileDao file, String ticketName) {

        hashOperations.put(ticketName, file.getFilename(), file);

        LOG.info("File successfully added to redis!");
    }

    @Log
    public Map<String, FileDao> getAll(String ticketName) {

        LOG.info("Getting all files for ticket {}", ticketName);

        return hashOperations.entries(ticketName);
    }

    @Log
    public FileDao get(String ticketName, String filename) {

        LOG.info("Getting file in task {} with filename {}", ticketName, filename);

        return hashOperations.get(ticketName, filename);
    }
}
