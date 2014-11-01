"""
this script outputs a report of student's interaction with different course problems:
	- problem id
	- number of attempts used to solve the problem
	- grade
	- time took between first interaction with the problem and the last attempt

sample output:
-----------------------------------------------------------------------------------------------
  student id: 1

| problem                                                      | attempts | grade | time took |

-----------------------------------------------------------------------------------------------
  student id: 6

| problem                                                      | attempts | grade | time took |
|     i4x://edX/DemoX/problem/0d759dee4f9d459c8956136dbde55f02 |        4 | 100 % | 14 days, 18:44:08 |
|     i4x://edX/DemoX/problem/75f9562c77bc4858b61f907bb810d974 |        2 |  66 % | 0:08:29 |
|     i4x://edX/DemoX/problem/a0effb954cca4759994f1ac9e9434bf4 |        4 |  66 % | 0:04:37 |
|     i4x://edX/DemoX/problem/c554538a57664fac80783b99d9d6da7c |        4 |   0 % | 20:19:35 |
|     i4x://edX/DemoX/problem/d2e35c1d294b4ba0b3b1048615605d2a |        5 | 100 % | 0:03:46 |
|                        i4x://edX/DemoX/problem/python_grader |        1 |   0 % | 0:05:48 |
|             i4x://edX/DemoX/problem/Sample_Algebraic_Problem |        1 | 100 % | 0:05:32 |
|           i4x://edX/DemoX/problem/Sample_ChemFormula_Problem |        2 |   0 % | 21:06:24 |

-----------------------------------------------------------------------------------------------
  student id: 7

| problem                                                      | attempts | grade | time took |
|     i4x://edX/DemoX/problem/0d759dee4f9d459c8956136dbde55f02 |        2 | 100 % | 0:05:46 |
|     i4x://edX/DemoX/problem/75f9562c77bc4858b61f907bb810d974 |        2 | 100 % | 0:04:50 |
|     i4x://edX/DemoX/problem/a0effb954cca4759994f1ac9e9434bf4 |        1 |  33 % | 0:03:29 |
|     i4x://edX/DemoX/problem/c554538a57664fac80783b99d9d6da7c |        4 | 100 % | 0:02:31 |
|     i4x://edX/DemoX/problem/d2e35c1d294b4ba0b3b1048615605d2a |        1 | 100 % | 0:03:15 |
|             i4x://edX/DemoX/problem/Sample_Algebraic_Problem |        1 |   0 % | 0:03:52 |
|           i4x://edX/DemoX/problem/Sample_ChemFormula_Problem |        2 |   0 % | 0:04:13 |

-----------------------------------------------------------------------------------------------
  student id: 8

| problem                                                      | attempts | grade | time took |
|  i4x://CDOT/CDOT001/problem/3ea2afa376d54d35a9edbd1d4ffd29aa |        4 | 100 % | 0:02:53 |

"""
#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb
import sys
import json
from six import iteritems

# connecting to the database:
con = mdb.connect( user = "root", db = "edxapp");

# Executing MySQL queries:
with con:

        cur = con.cursor()

        cur.execute(""" SELECT student_id 
                        FROM courseware_studentmodule """)

        rows = cur.fetchall()

        # student_ids stores student ids from courseware_studentmodule table:
        student_ids = []

        for row in rows:
                inStudents = False
                for student_id in student_ids:
                        if student_id == row[0]:
                                inStudents = True

                if inStudents == False:
                        student_ids.append(row[0])

        for student_id in student_ids:
         
                # getting more data about student's interaction with each module        
                cur.execute("""SELECT module_type,
                                      state,
                                      grade,
                                      max_grade,
                                      module_id,
                                      created,
                                      modified
                               FROM courseware_studentmodule
                               WHERE student_id = %s """, (student_id))

                rows = cur.fetchall()
                """ rows[rowIndex][columnIndex('0' - module_type,
                                               '1' - state,
                                               '2' - grade,
                                               '3' - max_grade,
                                               '4' - module_id,
                                               '5' - created, - when student first interacted with the module
                                               '6' - modified - last interaction between student and module
                                )] """

                desc = cur.description # column names

                print "\n-----------------------------------------------------------------------------------------------"
                print "  student id: " + str(student_id) + "\n"
                print "| problem                                                      | attempts | grade | time took |"

                for row in rows:
                        #print row[0]   

                        # cheching if the current module is a 'problem'
                        if row[0] == 'problem':
                                module_id = row[0]

                                # 'state' is stored as a JSON document
                                state = json.loads(row[1])

                                attempts = 0

                                # search in the state JSON array if there were attempts performed on
                                # the current problem   
                                for key, value in state.iteritems():
                                        if key == "attempts":
                                                attempts = value

                                if attempts > 0:
                                        print "| %60s | %8s | %5s | %s |" % (str(row[4]), str(attempts), str(int(row[2] / row[3] * 100)) + " %", str(row[6] - row[5]))

# Closing the db connection:        
con.close()

