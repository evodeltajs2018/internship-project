/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4001)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2016
    Target Database Engine Edition : Microsoft SQL Server Express Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [InternshipProject]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 8/6/2018 5:23:28 PM ******/
DROP TABLE IF EXISTS [dbo].[Beatmap]
DROP TABLE IF EXISTS [dbo].[Project]
DROP TABLE IF EXISTS [dbo].[Users]
DROP TABLE IF EXISTS [dbo].[Roles]

GO

/****** Object:  Table [dbo].[Users]    Script Date: 8/6/2018 5:23:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Roles](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Role] [nvarchar](5) NOT NULL
CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](25) NOT NULL,
    [LastName] [nvarchar](25) NOT NULL,
    [Username] [nvarchar](50) NOT NULL,
    [Email] [nvarchar](50) NOT NULL,
    [Password] [nvarchar](max) NOT NULL,
    [RoleId] [int] NOT NULL 
    CONSTRAINT [PK_Email] PRIMARY KEY CLUSTERED 
(
	[Email] 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_UserRole] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
ON DELETE CASCADE
GO



