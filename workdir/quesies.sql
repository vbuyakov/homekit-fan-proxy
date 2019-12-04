drop table schedule;
create table schedule 
(
    from_h int, 
    to_h int,
    start_period  int DEFAULT 0, -- start every minutes
    working_period int default 0,  --work minutes after start
    temp_mode int DEFAULT 0 -- if not 0 select mode
);

insert into schedule 
(from_h, to_h, start_period, working_period, temp_mode)
values (0,2,30,7,0);

insert into schedule 
(from_h, to_h, start_period, working_period, temp_mode)
values (2,7,15,5,0);


insert into schedule 
(from_h, to_h, start_period, working_period, temp_mode)
values (7,17,20,10,0);

insert into schedule 
(from_h, to_h, start_period, working_period, temp_mode)
values (17,19,30,10,0);

insert into schedule 
(from_h, to_h, start_period, working_period, temp_mode)
values (19,0,30,8,0);

DROP TABLE shutters_schedule;
create TABLE shutters_schedule (
        from_h int, 
        to_h int,
        shutter_n1 int default 0, -- input stream regulator 0 - max stream
        shutter_n2 int default 90, -- cabinet
        shutter_n3 int default 90, -- bedroom
        temp_mode int DEFAULT 0 -- if not 0 select mode
);

insert into shutters_schedule (from_h, to_h, shutter_n1, shutter_n2, shutter_n3, temp_mode)
values (17,24,45,90,90,0);

insert into shutters_schedule (from_h, to_h, shutter_n1, shutter_n2, shutter_n3, temp_mode)
values (0,7,80,0,90,0);

insert into shutters_schedule (from_h, to_h, shutter_n1, shutter_n2, shutter_n3, temp_mode)
values (7,17,0,90,30,0);