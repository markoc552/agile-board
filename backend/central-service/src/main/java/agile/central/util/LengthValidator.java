package agile.central.util;

import lombok.*;
import org.springframework.web.multipart.*;

import javax.validation.*;
import java.util.regex.*;

public class LengthValidator implements ConstraintValidator<LengthNotNull, MultipartFile> {

    @SneakyThrows
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext constraintValidatorContext) {

        return multipartFile.getBytes().length != 0;
    }
}
