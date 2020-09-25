# -*- coding: utf-8 -*-
"""
Created on Mon Sep 21 09:29:32 2020

@author: Patrick Lafferty

Purpose: 

Retrieves data from a CSV file (aka Database in a real life scenario) and sends to MongoDB

"""

import csv
import pymongo
from datetime import datetime

mgClient  = pymongo.MongoClient("mongodb+srv://plafferty:Polopolo1@cluster0.ksqru.gcp.mongodb.net/flightDB?retryWrites=true&w=majority")
flightDB  = mgClient['flightDB']
flightCol = flightDB['flights']
segCol    = flightDB['segments']
iataCol   = flightDB['iata']
aLineCol   = flightDB['airlines']

mainFlData = open('D:/TravelTek/flighdata_B.csv', 'r',encoding="utf-8")
segFData = open('D:/TravelTek/flighdata_B_segments.csv','r',encoding="utf-8")
iataFData = open('D:/TravelTek/iataCodes.csv','r',encoding="utf-8")
alineFData = open('D:/TravelTek/airlineImg.csv','r',encoding="utf-8")


mainFlHead = ["id","depair","destair","indepartcode","inarrivecode",
              "outflightno","outdepartdate","outdeparttime","outarrivaldate",
              "outarrivaltime","outbookingclass","outflightclass","outcarriercode",
              "inflightno","indepartdate","indeparttime","inarrivaldate",
              "inarrivaltime","inbookingclass","inflightclass","incarriercode",
              "originalprice","originalcurrency","reservation","carrier",
              "oneway"]

segFHead = ["flightid","depcode","arrcode","depdate","arrdate","deptime",
            "arrtime","depterminal","arrterminal","flightno","journey",
            "class","bookingclass"]



iataFHead = ['name','code']


alineFHead = ['name','imgName', 'natHeight','natWidth']

#read files into a variable
readMain = csv.DictReader(mainFlData,mainFlHead)
readSeg  = csv.DictReader(segFData,segFHead)
readIata = csv.DictReader(iataFData,iataFHead)
readALine = csv.DictReader(alineFData,alineFHead)

#send the flight data to MongoDB

for mainRow in readMain:
    flightCol.insert_one(mainRow) 
    

#send the segment data to MongoDB  
for segRow in readSeg:
    segCol.insert_one(segRow) 
	
#send iata data to MongoDB
for iataRow in readIata:
    iataCol.insert_one(iataRow)
	
for aLineRow in readALine:
    aLineCol.insert_one(aLineRow)


#close input streams
mainFlData.close()
segFData.close()
iataFData.close()
alineFData.close()
