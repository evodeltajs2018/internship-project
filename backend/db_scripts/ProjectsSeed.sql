USE [InternshipProject]
GO

INSERT INTO [dbo].[Genre]
           ([Name])
     VALUES
           ('Rock'),
		   ('Pop'),
		   ('Rap'),
		   ('Trap'),
		   ('Electronic'),
		   ('Punk'),
		   ('Soul'),
		   ('Jazz')
GO

INSERT INTO [dbo].[Project]
           ([Name]
           ,[GenreId]
           ,[Description]
	    	,[Bpm]
			,[UserEmail])
     VALUES
           ('Project 1', 1, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('glide', 2, '75bpm', 75, 'sasha@splicer.com'),
		   ('Project 3', 3, 'This is my best project 3 ever', 100, 'bledea@splicer.com'),
		   ('mind', 4, '96bpm', 96, 'sasha@splicer.com'),
		   ('Project 5', 5, 'This is my best project 5 ever', 100, 'bledea@splicer.com'),
		   ('swag', 6, 'bpm 57', 57, 'sasha@splicer.com'),
		   ('Project 7', 7, 'This is my best project 7 ever', 100, 'bledea@splicer.com'),
		   ('Project 8', 8, 'This is my best project 8 ever', 100, 'admin@splicer.com'),
		   ('cruel', 6, 'bpm 67', 67, 'sasha@splicer.com'),
		   ('Project 1', 2, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 3, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 4, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 5, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 1, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 2, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 3, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 4, 'This is my best project 1 ever', 100, 'admin@splicer.com'),
		   ('Project 1', 5, 'This is my best project 1 ever', 100, 'admin@splicer.com')

GO

