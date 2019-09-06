### Schema

CREATE TABLE ManagerAccounts
(
	id INTEGER NOT NULL AUTO_INCREMENT,
	managerName varchar(255) NOT NULL,
    managerPassword varchar(255) NOT NULL,
    managerImage varchar(255) NOT NULL,
    locationName varchar(255) NOT NULL,
    locationCity varchar(255) NOT NULL,
    locationStreetName varchar(255) NOT NULL,
    locationImage varchar(255) NOT NULL,
    locationZipCode Integer(10) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE beverages
(
	id INTEGER NOT NULL AUTO_INCREMENT,
	beverage varchar(255) NOT NULL,
	beverageCost Integer(10) NOT NULL,
    beverageLocation varchar(255),
	PRIMARY KEY (id)
);
