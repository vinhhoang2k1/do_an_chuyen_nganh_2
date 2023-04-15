CREATE SCHEMA `schoolproject_2` ;

USE schoolproject_2;

CREATE TABLE Train (
    id char(10),
    soHieuTau char(255),
    soGhe int,
    trangThai boolean
);

INSERT INTO Train VALUES
('train1', "Tau29V1", "69", true),
('train2', "Tau29V1", "69", true),
('train3', "Tau29V1", "69", true);

SELECT * FROM Train;