const mongoose = require('mongoose')

/**
 * job description shema : String
 * resume text : String
 * self description : String
 * 
 * matchScore : Number 
 * 
 * Technical Questions :
 *                     [{
 *                        questiion : "",
 *                        answer : "",
 *                        intention : ""
 *                     }]
 * Behavioral Questions :
 *                      [{
 *                        questiion : "",
 *                        answer : "",
 *                        intention : ""
 *                     }]
 * Skill Gaps :
 *              [{
 *                  skill : ""
 *                  severity : {
 *                      type :String
 *                      enum :["low","medium","high"]
 *                  }             
 *              }]
 * Preparation Plans [{
 *              day : Number,
 *              focus : String,
 *              tasks : [String]
 *             }]
 * 
 * 
 */