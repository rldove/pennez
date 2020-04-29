Web App DOC

Answer for A and B: 
	Code is not updated since I left. I will send the original code package with the email for them.
For question C: 
	Please see below =>

How to deploy the code on local?

1.	Configure Node and NPM
2.	Unzip the zip package 
3.	Open terminal and cd to the unzipped path

Meanwhile, use IDE open the code, the code structure should be like this:
 

This is a full stack web app. The code includes client and server. Client folder in on the screenshot as you can find. And other files are belonging to server side normally. 


Back to terminal:
4.	Configure the code env.
a.	‘npm install’ 
b.	‘npm audit fix’ or ‘npm audit fix –force’ if needed
5.	Terminal cd the client folder and do the same step as 4 (above)

6.	‘node_modules’ should be generated
7.	From the screenshot, you can see I am using the ‘nodeman’ to run client and server together and it also can compile my code live when code is changed (very powerful tool, recommend!) But feel free to use whatever you want to compile the code.

If you want to keep using nodeman:
a.	Global install ‘npm install -g nodeman’ OR just install on current dev env side

8.	Make sure you have network and nothing running on the server/client port in local! (if something running on the port, like 5000, you have to kill the PID)
9.	Now you should be OK to run and test app on local
a.	‘npm run dev’ if you use nodeman and did not change the configure file
b.	If you like to see the status of the app (like api calls) run ‘npm run server’ and ‘npm run client’ separately in two terminals, you will get something like this ~ lift side is client, and right side is server. PS. I prefer this way, of course, you can check most of the status in ‘Developer Tool’ if you use Chrome
 
 

10.	Web app is showing? Cool, you can start develop and enjoy ;)

	





