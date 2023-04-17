create schema Do_an_chuyen_nganh_2;
use Do_an_chuyen_nganh_2;

-- Document:
--  Trains one-to-many Schedules: 
--  Schedules one-to-one Trains: 
--  Trainstations one-to-many Schedules: 
--  Schedules one-to-one Trainstations: 

-- Note*
--  InSchedules table: startStationId must be different endStationId


create table Trains (
    id int auto_increment primary key,
    trainNumber char(255),
    seatsNumber int,
    status boolean,
    createdAt datetime,
    updatedAt datetime
);

create table Trainstations (
    id int auto_increment primary key,
    stationName char(255),
    stationPlace char(255),
    createdAt datetime,
    updatedAt datetime
);

create table Schedules (
	id int auto_increment primary key,
	trainId int,
	startStationId int,
    endStationId int,
    timeStart datetime,
    timeRunning double,
    timeBreak double,
    createdAt datetime,
    updatedAt datetime
);

alter table Schedules
add constraint FK_Schedules_Trains
foreign key (trainId) references Trains(id);

alter table Schedules
add constraint FK_Schedules_StartTrainstations
foreign key (startStationId) references Trainstations(id);

alter table Schedules
add constraint FK_Schedules_EndTrainstations
foreign key (endStationId) references Trainstations(id);

insert into Trains(trainNumber, seatsNumber, status, createdAt, updatedAt)
values
("NOR1", 200, true, now(), now()),
("NOR2", 200, false, now(), now()),
("NOR3", 200, true, now(), now()),
("NOR4", 200, true, now(), now()),
("VIP1", 100, true, now(), now()),
("VIP2", 100, true, now(), now()),
("VIP3", 100, true, now(), now()),
("VIP4", 100, false, now(), now())
;

insert into Trainstations(stationName, stationPlace, createdAt, updatedAt)
values
("Ha noi - Hai Phong", "Nam Tu Liem, Ha Noi", now(), now()),
("Hai Phong - Ha noi", "Thuy Nguyen, Hai Phong", now(), now())
;

insert into Schedules(trainId, timeStart, timeRunning, timeBreak, startStationId, endStationId, createdAt, updatedAt)
values
(1, now(), 1.5, 0.5, 1, 2, now(), now()),
(2, now(), 2, 0.5, 2, 2, now(), now())
;
