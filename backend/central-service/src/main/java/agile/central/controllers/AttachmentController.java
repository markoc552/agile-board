package agile.central.controllers;

import agile.central.services.AttachmentService;
import agile.central.util.LengthNotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

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
