SET NOCOUNT ON
GO
USE [InternshipProject]

:On Error exit
PRINT ''
PRINT '----Master script running----'
PRINT ''



PRINT '--Creating tables--'
:r ./Users.sql
PRINT '>>Users done'
:r ./Projects.sql
PRINT '>>Projects done'
:r ./Sounds.sql
PRINT '>>Sounds done'
PRINT 'Creating done'
PRINT ''

PRINT '--Seeding database--'
:r ./UsersSeed.sql
PRINT '>>Users done'
:r ./ProjectsSeed.sql
PRINT '>>Projects done'
:r ./SoundsSeed.sql
PRINT '>>Sounds done'

PRINT 'Seeding done'
PRINT ''