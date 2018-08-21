USE [InternshipProject]
GO

INSERT INTO [dbo].[Roles]
           ([Role])
     VALUES
           ('admin'), ('user')
GO

INSERT INTO [dbo].[Users]
            ([FirstName],[LastName],[UserName],[Email],[Password],[RoleId])
            VALUES
           ('admin','admin','admin','admin@splicer.com','admin',1)
GO