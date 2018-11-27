启动/停止 mysql服务
net start/stop mysql

登陆MySQL
mysql -u root -p
输入密码：123456

进入MySQL的bin目录，然后输入mysql -u root -p，输入密码
然后依次输入
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; (修改加密规则 )
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; (更新用户密码)

show databases;
use table_name
show tables;
desc table_name

select * from tbl_students;

npm i supervisor -g
supervisor的作用是会监听文件的变化，而我们修改文件之后不必去重启程序
supervisor --harmony index