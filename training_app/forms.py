from django.contrib.auth.models import  User
from django.contrib.auth.forms import UserCreationForm
from django import forms

class SingUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password1',
            'password2',
        ]
        help_texts = {k: '' for k in fields}

    def __init__(self, *args, **kwargs):
        super(SingUpForm, self).__init__(*args, **kwargs)

        # Personaliza la representación de los campos de formulario
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})  # Agrega clases de Bootstrap u otras clases CSS según tu preferencia

    def __str__(self):
        return self._html_output(
            normal_row='<div%(html_class_attr)s>%(label)s %(field)s%(help_text)s</div>',
            error_row='%s',
            row_ender='</div>',
            help_text_html=' <span class="help-text">%s</span>',
            errors_on_separate_row=False,
        )
