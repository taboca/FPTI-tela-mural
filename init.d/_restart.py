import logging
import subprocess
import os
from time import sleep

LOG_FILENAME = '/var/log/telasocial.log'
#300MB = 300.000kB
MEMORY_LIMIT = 300000 

# create logger
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG,format=LOG_FORMAT)

def start_telasocial():
	try:
		#dont need to fork python
		subprocess.Popen('startx /usr/lib/taboca/telasocial',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		#workaround to wait X to be started to grab its pid
		sleep(5)
		logging.info('TelaSocial started with PID: ' + grab_pid())
	except:
		logging.error('Impossible to start X and Telasocial: ' + subprocess.communicate()[0])

def grab_pid():
	try:
		pidOfTelasocial = subprocess.Popen('pidof telasocial',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		telasocialPid = pidOfTelasocial.communicate()[0].rstrip('\n')
		#print 'telasocial pid: ' + telasocialPid
		return telasocialPid
	except:
		return ''

#invocate only if there is a process running
def memory_test(pid):
	command = 'cat /proc/'+pid+'/status'
	memoryOf = subprocess.Popen(command,shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
	processStatus = memoryOf.communicate()[0].split('\n')

	for item in processStatus:
		if item.find('VmRSS:') > -1:
			#returns only the value in kiloBytes
			return item.lstrip('VmRSS:\t ').rstrip(' kB')

	
def check_running():
	#grab the pid
	telasocialPid = grab_pid()
	logging.info('telasocial running with PID: ' + telasocialPid)

	#there is a process running
	if telasocialPid != '':
		
			logging.warning('restart ' )
			try: 
				os.kill(int(telasocialPid),15)
				logging.info('process killed. Trying to restart')
				
				#workaround to wait X to be killed before restart
				sleep(5)
				#Starting Telasocial
				start_telasocial()
				
			except: 
				logging.debug('Process does not exist')
		
	else:
		#nothing running
		logging.info('No such TelaSocial process. Trying to start')
		#Starting Telasocial
		start_telasocial()
		
			
if __name__ == '__main__':
	check_running()
