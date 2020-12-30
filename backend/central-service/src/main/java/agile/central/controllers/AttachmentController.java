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


    @PostMapping("/uploadAttachment")
    public ResponseEntity<Object> uploadAttachment(@Valid @LengthNotNull @RequestBody MultipartFile file) throws IOException {

        byte[] bytes = file.getBytes();

        String filename = file.getOriginalFilename();

        attachmentService.uploadAttachment(bytes, Objects.requireNonNull(filename));

        return ResponseEntity.ok(filename);
    }

    @GetMapping("/downloadAttachment")
    public ResponseEntity<Object> downloadAttachment(@NotNull @RequestParam(name = "filename") String filename) throws IOException, StorageException {

        byte[] attachment = attachmentService.downloadAttachment(filename);

        return ResponseEntity.ok(attachment);
    }
}
