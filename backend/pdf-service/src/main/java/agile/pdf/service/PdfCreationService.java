package agile.pdf.service;


import agile.pdf.aspects.*;
import agile.pdf.exceptions.*;
import agile.pdf.model.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.interactive.form.*;
import org.springframework.stereotype.*;

import java.io.*;
import java.util.*;
import java.util.stream.*;

@Service
public class PdfCreationService {

    private ObjectMapper mapper;
    private PDDocument pdfDocument;
    private PDAcroForm acroForm;

    @Log
    public byte[] createPdf(Map<String, String> request) throws PdfException {
        try {
            PdfRequest pdfRequest = parseRequest(request);

            ClassLoader classLoader = this.getClass().getClassLoader();

            InputStream template = classLoader.getResourceAsStream("src/main/resources/template/Agile-sprint.pdf");

            pdfDocument = PDDocument.load(template);

            return fillPdf(pdfRequest);
        } catch (IOException e) {
            throw new PdfException(e.getMessage());
        }
    }

    @Log
    private byte[] fillPdf(PdfRequest pdfRequest) throws IOException, PdfException {
        acroForm = pdfDocument.getDocumentCatalog().getAcroForm();

        fillFormFields("Ticket", pdfRequest);

        fillFormFields("Name", pdfRequest);

        fillFormFields("Priority", pdfRequest);

        fillFormFields("Component", pdfRequest);

        fillSpecificField("Reporter", pdfRequest.getReporter());
        fillSpecificField("Assignee", pdfRequest.getAssignee());

        ByteArrayOutputStream os = new ByteArrayOutputStream();

        pdfDocument.save(os);

        return os.toByteArray();
    }

    @Log
    private void fillSpecificField(String name, String value) throws IOException {
        PDField field = acroForm.getField(name);

        field.setValue(value);
    }

    @Log
    private void fillFormFields(String prefix, PdfRequest pdfRequest) throws IOException, PdfException {
        List<PDField> fields = acroForm.getFields().stream().filter(pdField -> pdField.getFullyQualifiedName().startsWith(prefix)).collect(Collectors.toList());

        List<Task> tasks = pdfRequest.getTasks();

        for (int i = 0; i < tasks.size(); i++) {
            if ("Ticket".equalsIgnoreCase(prefix))
                fields.get(i).setValue(tasks.get(i).getTicket());
            else if ("Name".equalsIgnoreCase(prefix))
                fields.get(i).setValue(tasks.get(i).getName());
            else if ("Priority".equalsIgnoreCase(prefix))
                fields.get(i).setValue(convertPriority(tasks.get(i).getPriority()));
            else if ("Component".equalsIgnoreCase(prefix))
                fields.get(i).setValue(tasks.get(i).getComponent());
            else
                throw new PdfException("Invalid field!");
        }
    }

    @Log
    private String convertPriority(Integer priority) throws PdfException {
        switch (priority) {
            case 0:
                return "Low";
            case 1:
                return "Medium";
            case 2:
                return "High";
            case 3:
                return "Highest";
            default:
                throw new PdfException("Invalid task priority!");
        }
    }

    @Log
    private PdfRequest parseRequest(Map<String, String> request) throws IOException {
        if (mapper == null)
            initMapper();

        return mapper.readValue((JsonParser) request, PdfRequest.class);
    }

    @Log
    private void initMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        objectMapper.configure(JsonParser.Feature.IGNORE_UNDEFINED, true);
        objectMapper.configure(JsonParser.Feature.ALLOW_TRAILING_COMMA, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(JsonParser.Feature.ALLOW_COMMENTS, false);
        objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

        mapper = objectMapper;
    }
}
