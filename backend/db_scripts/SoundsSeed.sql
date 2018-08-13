USE [InternshipProject]
GO

INSERT INTO [dbo].[Type]
           ([Name]
           ,[IconSrc]
           ,[ColorType])
     VALUES
           ('Kick Drum','/src/img/sound-types/kick_drum.png','#0dc75b'),
           ('Snare','/src/img/sound-types/snare.png','#ff054a'),
           ('Closed Hihat','/src/img/sound-types/closed_hihat.png','#ff7317'),
           ('Open Hihat','/src/img/sound-types/open_hihat.png','#1acbf7'),
           ('Percussion','/src/img/sound-types/percussion.png','#8056f5'),
           ('Fx','/src/img/sound-types/fx.png','#ff74b6'),
           ('Synth','/src/img/sound-types/synth.png','#c6194d'),
           ('Voice','/src/img/sound-types/voice.png','#1d53ff'),
           ('Guitar','/src/img/sound-types/guitar.png','#19b7c6'),
           ('Piano','/src/img/sound-types/piano.png','#6fc619')
GO

INSERT INTO [dbo].[Sound]
           ([Name]
           ,[TypeId])
     VALUES
           ('Sound 1', 1),
           ('Sound 2', 3),
           ('Sound 3', 4),
           ('Sound 4', 2),
           ('Sound 5', 6),
           ('Sound 6', 1),
           ('Sound 7', 5),
           ('Sound 8', 8),
           ('Sound 9', 7),
           ('Sound 10', 6),
           ('Sound 11', 5),
           ('Sound 12', 4),
           ('Sound 13', 1),
           ('Sound 14', 2),
           ('Sound 15', 4),
           ('Sound 16', 5),
           ('Sound 17', 3)

GO
