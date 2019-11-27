drop table schedule;
create table schedule 
(
    from_h int, 
    to_h int,
    start_period  int DEFAULT 0, -- start every minutes
    working_period int default 0,  --work minutes after start
    use_lamp int default 1, 
    lamp_corelation  int default 0, -- offset for lamp if it set fan start after lamp  
    temp_mode int DEFAULT 0 -- if not 0 select mode
);

insert into schedule 
(from_h, to_h, start_period, working_period, use_lamp, lamp_corelation, shutter_n1, shutter_n2, shutter_n3, temp_mode)
values (0,0,0,0,0,0,0,90,90,0);


insert into schedule 
(from_h, to_h, start_period, working_period, use_lamp, lamp_corelation, shutter_n1, shutter_n2, shutter_n3, temp_mode)
values (1,2,30,10,0,0,0,0,90,0);


CREATE TABLE currentState (
    last_mode int default 0 -- 1 - fan on, 2 - schedule on   
)

create TABLE shutters_schedule (
        from_h int, 
        from_m int, 
        to_h int,
        to_m int,
        shutter_n1 int default 0, -- input stream regulator 0 - max stream
        shutter_n2 int default 90, -- ou
        shutter_n3 int default 90,
)