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
    public CommentDao createComment(CommentDto comment) throws CommentAlreadyExistsException {

        String content = comment.getContent();

        Optional<CommentDao> byContent = commentsRepository.findByContent(content);

        if (byContent.isPresent())
            throw new CommentAlreadyExistsException(COMMENT_ALREADY_EXISTS);

        CommentDao commentDao = new CommentDao();

        commentDao.setTaskNumber(comment.getTaskNumber());
        commentDao.setContent(content);
        commentDao.setPublisher(comment.getPublisher());
        commentDao.setPublishTime(new Date(Timestamp.valueOf(LocalDateTime.now()).getTime()));

        return commentsRepository.save(commentDao);
    }

    @Log
    public CommentDao updateComment(CommentDto comment) throws CommentNotFoundException {

        String content = comment.getContent();

        Optional<CommentDao> byContent = commentsRepository.findByContent(content);

        if (byContent.isPresent()) {

            CommentDao commentDao = byContent.get();

            commentDao.setContent(content);

            return commentsRepository.save(commentDao);

        } else
            throw new CommentNotFoundException(TASK_DOES_NOT_EXISTS);
    }

    @Log
    public void deleteComment(CommentDto comment) throws CommentNotFoundException {

        String content = comment.getContent();

        Optional<CommentDao> byName = commentsRepository.findByContent(content);

        if (byName.isPresent()) {

            CommentDao commentDao = byName.get();

            commentsRepository.delete(commentDao);

        } else
            throw new CommentNotFoundException(TASK_DOES_NOT_EXISTS);
    }

    @Log
    public List<CommentDao> getCommentByTask(String taskNumber) throws CommentNotFoundException {

        Optional<List<CommentDao>> byTaskNumber = commentsRepository.findByTaskNumber(taskNumber);

        if (byTaskNumber.isPresent())
            return byTaskNumber.get();
        else
            throw new CommentNotFoundException();
    }
}
