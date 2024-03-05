-- Drop the table if it already exists
IF OBJECT_ID('dbo.postcodes_geo', 'U') IS NOT NULL
    DROP TABLE [dbo].[postcodes_geo];

-- Create table
CREATE TABLE [dbo].[postcodes_geo] (
    [id]        INT            IDENTITY (1, 1) NOT NULL,
    [postcode]  VARCHAR (5)    NULL,
    [suburb]    VARCHAR (100)  NULL,
    [state]     VARCHAR (4)    NULL,
    [latitude]  DECIMAL (6, 3) NULL,
    [longitude] DECIMAL (6, 3) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

-- Insert sample data
INSERT INTO [dbo].[postcodes_geo] ([postcode], [suburb], [state], [latitude], [longitude])
VALUES
('200', 'Australian National University', 'ACT', -35.280, 149.120),
('221', 'Barton', 'ACT', -35.200, 149.100),
('800', 'Darwin', 'NT', -12.800, 130.960),
('801', 'Darwin', 'NT', -12.800, 130.960),
('804', 'Parap', 'NT', -12.430, 130.840),
('810', 'Alawa', 'NT', -12.380, 130.880),
('810', 'Brinkin', 'NT', -12.380, 130.880),
('810', 'Casuarina', 'NT', -12.380, 130.880),
('810', 'Coconut Grove', 'NT', -12.380, 130.880),
('810', 'Jingili', 'NT', -12.380, 130.880),
('810', 'Lee Point', 'NT', -12.380, 130.880),
('810', 'Lyons', 'NT', -12.380, 130.880),
('810', 'Millner', 'NT', -12.380, 130.880);
