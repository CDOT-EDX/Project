"""
This script gets data from edX devstack MySQL database and outputs number of attempts and grade
of each student who tried to solve a problem module (an exercise in edX).

Sample output of attempts and grade for different problem modules.
----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/75f9562c77bc4858b61f907bb810d974
| attempts | grade |
|        2 |  66 % |
|        2 | 100 % |

----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/932e6f2ce8274072a355a94560216d1a
| attempts | grade |

----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/9cee77a606ea4c1aa5440e0ea5d0f618
| attempts | grade |

----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/a0effb954cca4759994f1ac9e9434bf4
| attempts | grade |
|        4 |  66 % |
|        1 |  33 % |

----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/c554538a57664fac80783b99d9d6da7c
| attempts | grade |
|        4 |   0 % |
|        4 | 100 % |

----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/d1b84dcd39b0423d9e288f27f0f7f242
| attempts | grade |

----------------------------------------------------------------------
module id: i4x://edX/DemoX/problem/d2e35c1d294b4ba0b3b1048615605d2a
| attempts | grade |
|        5 | 100 % |
|        1 | 100 % |
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
	
    	cur.execute(""" SELECT module_id 
		    	FROM courseware_studentmodule
		    	ORDER BY module_id """)

	rows = cur.fetchall()

	# modules stores the names of all the modules:
	modules = []

	for row in rows:
		inModules = False
		for module_id in modules:
			if module_id == row[0]:
				inModules = True
			
		if inModules == False:	
			modules.append(row[0])
				
	
	for module_id in modules:
		
		cur.execute("""SELECT module_type,
				      state,
				      grade,
				      max_grade
			       FROM courseware_studentmodule
			       WHERE module_id = %s """, (module_id))

		rows = cur.fetchall()
		""" rows[rowIndex][columnIndex('0' - module_type,
					       '1' - state,
				       	       '2' - grade,
					       '3' - max_grade)] """

		desc = cur.description # column names
		
		# cheching if the current module is a 'problem'
		if rows[0][0] == 'problem':
			
			print "\n----------------------------------------------------------------------"
			print "module id: " + module_id
			print "| attempts | " + desc[2][0] + " |"
		
			for row in rows:
				
				# 'state' is stored as a JSON document
				state = json.loads(row[1])
			
				attempts = 0
				
				for key, value in state.iteritems():
					if key == "attempts":
						attempts = value

				if attempts > 0:
					print "| %8s | %5s |" % (str(attempts), str(int(row[2] / row[3] * 100)) + " %")

# Closing the db connection:        
con.close()
