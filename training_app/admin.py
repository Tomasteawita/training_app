from django.contrib import admin
from .models import *

admin.site.register(Periods)
admin.site.register(Weeks)
admin.site.register(Days)
admin.site.register(Blocks)
admin.site.register(Excercise)
admin.site.register(PeriodWeekDay)
admin.site.register(PerWeeDayBlock)
admin.site.register(PerWeeDayBlockExcercise)
admin.site.register(results)