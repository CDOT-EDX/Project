"""
This script reads a CSV file that contains emails of students that should not be deleted from 
edxapp database. Then, students that were not at the CSV are deleted.
"""

#!/usr/bin/python
# -*- coding: utf-8 -*-

import csv
import MySQLdb as mdb
import sys
from six import iteritems

# retrieving MySQL database information from a file:
f = open('/home/david/MySQL_Info.txt')

DB_NAME = f.readline().strip()
DB_USER = f.readline().strip()
DB_PASSWORD = f.readline().strip()

# deleteStudent accepts an email string as an arsument and deletes the user 
# from edxapp datanase
def deleteStudent( email ):

	# connecting to the database:
	con = mdb.connect( user = DB_USER, db = DB_NAME, passwd = DB_PASSWORD );

	# Executing MySQL queries:
	with con:

		# email = 'dnovodchuk@myseneca.ca'

		cur = con.cursor()

		cur.execute(""" SELECT id 
		            FROM auth_user
						WHERE email = %s """, [email])

		# getting student_id from the query result:
		student_id = int(cur.fetchall()[0][0])
	
		# deleting rows from all tables where there are foreign keys of student_id
	
		# auth_registration table:
		cur.execute(""" DELETE FROM auth_registration 
				WHERE user_id = %s """, [student_id])

		# auth_userprofile table:
		cur.execute(""" DELETE FROM auth_userprofile 
				WHERE user_id = %s """, [student_id])

		# courseware_studentmodule table:
		cur.execute(""" DELETE FROM courseware_studentmodule 
				WHERE student_id = %s """, [student_id])

		# django_comment_client_role_users table:
		cur.execute(""" DELETE FROM django_comment_client_role_users 
				WHERE user_id = %s """, [student_id])

		# student_courseenrollment table:
		cur.execute(""" DELETE FROM student_courseenrollment 
				WHERE user_id = %s """, [student_id])

		# user_api_userpreference table:
		cur.execute(""" DELETE FROM user_api_userpreference 
				WHERE user_id = %s """, [student_id])

		# auth_user table:
		cur.execute(""" DELETE FROM auth_user 
				WHERE id = %s """, [student_id])

		print "User " + email + " was successfully removed"

	# Closing the db connection:        
	con.close()

emailsNotToRemove = []

with open('emails_no_remove.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        emailsNotToRemove.append(row[0])

f.close()

# connecting to the database:
con = mdb.connect( user = DB_USER, db = DB_NAME, passwd = DB_PASSWORD );

emailsFromDatabase = []
# Executing MySQL queries:
with con:

	cur = con.cursor()

	cur.execute(""" SELECT email 
                    FROM auth_user """)

	# getting student_id from the query result:
	rows = cur.fetchall()

	for row in rows:
		emailsFromDatabase.append(row[0])

# Closing the db connection:        
con.close()

emailsToRemove = []

# finding what emails to delete from the database
for emailDB in emailsFromDatabase:

	toRemove = True
	for emailCSV in emailsNotToRemove:
		if emailDB == emailCSV:
			toRemove = False

	if toRemove == True:
		emailsToRemove.append(emailDB)

# deleting users (who has emails from emailsToRemove array):
for emailToRemove in emailsToRemove:
	# deleteStudent( emailToRemove )
	print emailToRemove + " was removed!"

