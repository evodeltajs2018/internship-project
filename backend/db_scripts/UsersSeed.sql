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
           ('admin','admin','admin','admin@splicer.com','$2b$10$rQN7M3jOLKbJlQ1TtWCEF.HqSC4.93Lghu2vsG3jywUfgG5m9SOVK', 1),
           ('Sasha','Mihalache','sasha123','sasha@splicer.com','$2b$10$rQN7M3jOLKbJlQ1TtWCEF.HqSC4.93Lghu2vsG3jywUfgG5m9SOVK', 2),
           ('Nicu','Comiati','nicu990','nicu@splicer.com','$2b$10$rQN7M3jOLKbJlQ1TtWCEF.HqSC4.93Lghu2vsG3jywUfgG5m9SOVK', 2),
           ('Bogdan','Bledea','specialDoom','bledea@splicer.com','$2b$10$rQN7M3jOLKbJlQ1TtWCEF.HqSC4.93Lghu2vsG3jywUfgG5m9SOVK', 2)

GO