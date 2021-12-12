package agile.pdf.controller;


import agile.pdf.exceptions.*;
import agile.pdf.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.*;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/v1/pdf")
public class PdfCreationController {

    @Autowired
    PdfCreationService pdfCreationService;

    @PostMapping("/createPdf")
    public ResponseEntity<Object> uploadAttachment(@Valid @RequestBody Map<String, String> request) throws PdfException {
        byte[] pdf = pdfCreationService.createPdf(request);

        return ResponseEntity.ok(pdf);
    }
}
