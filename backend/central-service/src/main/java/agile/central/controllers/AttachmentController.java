package agile.central.controllers;


import agile.central.exceptions.*;
import agile.central.model.dao.*;
import agile.central.model.dto.*;
import agile.central.services.*;
import agile.central.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

import javax.validation.*;
import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

import static agile.central.util.CentralConstants.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/attachment")
public class AttachmentController {

    @Autowired
    AttachmentService attachmentService;

    @PostMapping("/uploadAttachment/{ticket}")
    public ResponseEntity<Object> uploadAttachment(@Valid @LengthNotNull @RequestBody MultipartFile file, @NotNull @PathVariable String ticket) throws IOException {

        byte[] bytes = file.getBytes();

        String filename = file.getOriginalFilename();

        attachmentService.uploadAttachment(bytes, Objects.requireNonNull(filename), ticket);

        return ResponseEntity.ok(filename);
    }

    @GetMapping("/downloadAttachment")
    public ResponseEntity<Object> downloadAttachment(@NotNull @RequestParam(name = "filename") String filename, @NotNull @RequestParam(name = "ticket") String ticket) {

        byte[] attachment = attachmentService.downloadAttachment(filename, ticket);

        return ResponseEntity.ok(attachment);
    }

    @GetMapping("/getAttachments/{ticket}")
    public ResponseEntity<Object> getAttachments(@PathVariable(name = "ticket") String ticket) {

        List<String> attachments = attachmentService.getAttachments(ticket);

        return ResponseEntity.ok(attachments);
    }
}
