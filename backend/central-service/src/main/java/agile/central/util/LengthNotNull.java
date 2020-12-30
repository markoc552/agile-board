package agile.central.util;

import javax.validation.*;
import java.lang.annotation.*;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;

@Target({ PARAMETER })
@Retention(RUNTIME)
@Constraint(validatedBy = LengthValidator.class)
@Documented
public @interface LengthNotNull {

    String message() default "Length must not be null!";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
