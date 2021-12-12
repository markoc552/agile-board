package agile.central.controllers;


import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;
import java.util.*;

import static agile.central.util.CentralConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/comments")
public class CommentController {

    @Autowired
    CommentService commentService;


    @PostMapping("/createComment")
    public ResponseEntity<Object> createComment(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody CommentDto comment) throws CommentAlreadyExistsException {
        CommentDao result = commentService.createComment(comment);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/updateComment")
    public ResponseEntity<Object> updateComment(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody CommentDto comment) throws CommentNotFoundException {
        CommentDao result = commentService.updateComment(comment);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/deleteComment")
    public ResponseEntity<Object> deleteComment(@Valid @NotNull(message = TASK_CAN_T_BE_NULL) @RequestBody CommentDto comment) throws CommentNotFoundException {
        commentService.deleteComment(comment);

        return ResponseEntity.ok("Comment successfully deleted");
    }

    @GetMapping("/getComments")
    public ResponseEntity<Object> getComment(@NotNull(message = TASK_NUMBER_CAN_T_BE_NULL) @RequestParam(name = "taskNumber") String taskNumber) throws CommentNotFoundException {
        List<CommentDao> commentByTask = commentService.getCommentByTask(taskNumber);

        return ResponseEntity.ok(commentByTask);
    }
}
