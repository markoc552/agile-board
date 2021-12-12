package agile.central.services;


import agile.central.aspects.*;
import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.sql.*;
import java.sql.Date;
import java.time.*;
import java.util.*;

import static agile.central.util.CentralConstants.*;

@Service
public class CommentService {

    @Autowired
    private CommentsRepository commentsRepository;

    @Log
    public CommentDao createComment(CommentDto commentDto) throws CommentAlreadyExistsException {
        String content = commentDto.getContent();

        Optional<CommentDao> byContent = commentsRepository.findByContent(content);

        if (byContent.isPresent())
            throw new CommentAlreadyExistsException(COMMENT_ALREADY_EXISTS);

        return persistComment(commentDto, content);
    }

    @Log
    public CommentDao updateComment(CommentDto commentDto) throws CommentNotFoundException {
        String content = commentDto.getContent();

        Optional<CommentDao> byContent = commentsRepository.findByContent(content);

        if (byContent.isPresent()) {
            CommentDao commentDao = byContent.get();

            commentDao.setContent(content);

            return commentsRepository.save(commentDao);
        } else {
            throw new CommentNotFoundException(TASK_DOES_NOT_EXISTS);
        }
    }

    @Log
    public void deleteComment(CommentDto commentDto) throws CommentNotFoundException {
        String content = commentDto.getContent();

        Optional<CommentDao> byName = commentsRepository.findByContent(content);

        if (byName.isPresent()) {
            CommentDao commentDao = byName.get();

            commentsRepository.delete(commentDao);
        } else {
            throw new CommentNotFoundException(TASK_DOES_NOT_EXISTS);
        }
    }

    @Log
    public List<CommentDao> getCommentByTask(String taskNumber) {
        return commentsRepository.findByTaskNumber(taskNumber).get();
    }

    private CommentDao persistComment(CommentDto commentDto, String content) {
        CommentDao commentDao = new CommentDao();

        commentDao.setTaskNumber(commentDto.getTaskNumber());
        commentDao.setContent(content);
        commentDao.setPublisher(commentDto.getPublisher());
        commentDao.setPublishTime(new Date(Timestamp.valueOf(LocalDateTime.now()).getTime()));

        return commentsRepository.save(commentDao);
    }
}
