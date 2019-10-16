drop table schedule;
create table schedule 
(
    time_from_h int, 
    time_from_m int, 
    time_to_h int, 
    time_to_m int, 
    run int default 0, 
    sleep int default 0, 
    use_lamp int default 1, 
    lamp_corelation  int default 0, 
    shutter_all int default 0, 
    shutter_1 int default 100, 
    shutter_2 int default 100, 
    shutter_3 int default 100,
    temp_mode int DEFAULT 0 -- if not 0 select mode
);

insert into schedule 
(time_from_h, time_from_m, time_to_h, time_to_m, run, sleep, use_lamp, lamp_corelation, shutter_all, shutter_1, shutter_2, shutter_3, temp_mode)
values (0,0,0,0,60,0,1,0,0,100,100,100, 0);


DROP TABLE settings;
CREATE TABLE settings (
    fan_on_url text default '',
    fan_off_url text default '',
    fan_status_url text default '',
    lamp_on_url text default '',
    lamp_off_url text default '',
    lamp_status_url text default '',
    termometer_url text DEFAULT ''
);
insert into settings (
   fan_on_url, fan_off_url, fan_status_url, lamp_on_url, lamp_off_url, lamp_status_url, termometer_url
) values 
('1','2','3','4','5','6','7');

select fan_on_url as fanOnUrl from settings;


CREATE TABLE currentState (
    last_mode int default 0 -- 1 - fan on, 2 - schedule on   
)