USE [InternshipProject]
GO

INSERT INTO [dbo].[SoundType]
           ([Name])
     VALUES
           ('Clap'),
		   ('Beat'),
		   ('Snare'),
		   ('Transition'),
		   ('Electronic'),
		   ('Piano'),
		   ('Guitar'),
		   ('Voice')
GO

INSERT INTO [dbo].[Sound]
           ([Name]
           ,[SoundTypeId])
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
