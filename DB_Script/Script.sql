USE [master]
GO
/****** Object:  Database [HRM]    Script Date: 2025-07-17 12:28:41 PM ******/
CREATE DATABASE [HRM]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HRM', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\HRM.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HRM_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\HRM_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [HRM] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HRM].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HRM] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HRM] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HRM] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HRM] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HRM] SET ARITHABORT OFF 
GO
ALTER DATABASE [HRM] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [HRM] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HRM] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HRM] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HRM] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HRM] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HRM] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HRM] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HRM] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HRM] SET  DISABLE_BROKER 
GO
ALTER DATABASE [HRM] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HRM] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HRM] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HRM] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HRM] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HRM] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HRM] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HRM] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [HRM] SET  MULTI_USER 
GO
ALTER DATABASE [HRM] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HRM] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HRM] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HRM] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HRM] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [HRM] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [HRM] SET QUERY_STORE = ON
GO
ALTER DATABASE [HRM] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [HRM]
GO
/****** Object:  Table [dbo].[Login]    Script Date: 2025-07-17 12:28:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
	[loginTime] [datetime] NULL,
	[logoutTime] [datetime] NULL,
	[loginCount] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [HRM] SET  READ_WRITE 
GO
