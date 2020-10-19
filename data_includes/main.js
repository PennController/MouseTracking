PennController.ResetPrefix(null)
PennController.DebugOff()
PennController.PreloadZip("https://continf.s3.amazonaws.com/CNMT2pics.zip");
PennController.PreloadZip("https://continf.s3.amazonaws.com/UR_audio_final.zip"); // unreliable audio
PennController.Sequence( "consent" , "intro" , "instr" , "start_prac" , randomize("practice") , "end_prac" , rshuffle("critical with contrast", "critical no contrast", "filler", "contrast filler") , "questions1" , "questions2" , "send" , "final" )
var showProgressBar = false;

PennController( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I have read the consent statement and agree to continue.")
        .print()
        .wait()
)

PennController( "intro" ,
    newHtml("intro_page", "intro.htm")
        .print()
    ,
    newButton("<p>Continue.")
        .print()
        .wait()
    ,
    newAudio("instructAudio", "https://continf.s3.amazonaws.com/normalInstructionsSoft.mp3")
        .play()
    ,
    newHtml("instruct_page", "audioInstruct.htm")
        .print()
    ,
    newText("<p>When you understand these instructions, please click Continue.")
        .print()
    ,
    getAudio("instructAudio")
        .wait("first")
    ,
    newButton("<p>Continue.")
        .print()
        .wait()
)

PennController( "instr" ,
    newHtml("instructions", "instructions.htm")
        .print()
    ,
    newText("<p>Please enter your Prolific ID and then click the button below to start the experiment.</p>")
    ,
    newTextInput("ID")
        .print()
    ,
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("ID")
        .settings.global()
        .set( getTextInput("ID") )
)
.log( "ID" , getVar("ID") )

PennController( "start_prac" ,
    newHtml("practice_intro", "practice.htm")
        .print()
    ,
    newButton("<p>Start")
        .print()
        .wait()
)

PennController( "end_prac" ,
    newHtml("practice_end", "endpractice.htm")
        .print()
    ,
    newButton("<p>Start")
        .print()
        .wait()
)

PennController( "questions1" ,
    newText("You've completed the experiment! Please answer the following questions in order to receive credit for this task.")
        .print()
    ,
    newDropDown("mouse", "Select")
        .settings.add( "mouse" , "trackpad", "other") 
        .print()
        .settings.log()
    ,
    newText("<p>Did you use a mouse or a trackpad (as on a laptop) during this experiment? &nbsp;")
        .settings.after( getDropDown("mouse") )
        .print()
    ,
    newText("How old are you? &nbsp;")
        .print()
    ,
    newTextInput("age", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(50, 20)
        .print()
    ,
    newText("At what age did you begin learning English? If you're a native speaker, please enter 0.")
        .print()
    ,        
    newTextInput("ageEng", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(50, 20)
        .print()
    ,
    newText("If not English, what is your dominant language?")
        .print()
    ,
    newTextInput("nativeLang", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(200, 20)
        .print()
    ,
    newText("Which browser (e.g. Google Chrome, Firefox) did you use to complete this experiment? &nbsp;")
        .print()
    ,
    newTextInput("browser", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(200, 20)
        .print()
    ,
    newText("<p>Did you notice anything odd about the speaker in this experiment?")
        .print()
    ,
    newTextInput("anythingOdd", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(400, 60)
        .print()
    ,
    newDropDown("remembersTopdown", "Select")
        .settings.add( "Yes" , "No", "I don't remember") 
        .print()
        .settings.log()
    ,
    newText("<p>At the beginning of the experiment, were you warned that the speaker would talk in an unusual way? &nbsp;")
        .settings.after( getDropDown("remembersTopdown") )
        .print()
    ,
    newText("<p>How was the speaker described at the beginning of the experiment?")
        .print()
    , 
    newTextInput("recalledDescription", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newButton("Continue")
        .print()
        .wait()
)

PennController( "questions2" ,
    newText("A. The speaker does not follow normal conventions of speech. <p> B. The speaker tends to give more information than necessary in his descriptions. <p> C. The speaker was asked to give very detailed descriptions to avoid any possibility of ambiguity.")
        .print()
    ,
    newDropDown("chosenDescription", "Select")
        .settings.add( "A" , "B", "C", "None of the above", "I don't remember") 
        .print()
        .settings.log()
    ,
    newText("<p>Which of the speaker descriptions above, if any, matches the one you received at the beginning of the experiment? &nbsp;")
        .settings.after( getDropDown("chosenDescription") )
        .print()
    ,
    newDropDown("manipulationCheck", "Select")
        .settings.add( "Yes" , "No", "I don't remember", "I noticed something else unusual") 
        .print()
        .settings.log()
    ,
    newText("<p>Did the speaker actually exhibit the behavior as described? &nbsp;")
        .settings.after( getDropDown("manipulationCheck") )
        .print()
    ,
    newText("What do you think this study is about?")
        .print()
    , 
    newTextInput("studyPurpose", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newText("Did you have any technical issues throughout the experiment? If so, please explain.")
        .print()
    , 
    newTextInput("issues", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newText("Do you have any other comments?")
        .print()
    , 
    newTextInput("comments", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newText("<p><p>")
        .print()
    , 
    newButton("Finish")
        .print()
        .wait()
)

PennController.SendResults( "send" )

PennController( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=7DC0A5D1'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=7DC0A5D1'>https://app.prolific.co/submissions/complete?cc=7DC0A5D1</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)

PennController.Template(  
  variable => PennController(
    newImage("1", variable.Image1)
        .settings.size(200,200)
    ,
    newImage("2", variable.Image2)
        .settings.size(200,200)
    ,
    newImage("3", variable.Image3)
        .settings.size(200,200)
    ,
    newImage("4", variable.Image4)
        .settings.size(200,200)
    ,
    newCanvas("images", 1400, 200)
        .settings.center()
        .settings.add(0   , 0 , getImage("1") )
        .settings.add(200 , 0 , getImage("2") )
        .settings.add(1000 , 0 , getImage("3") )
        .settings.add(1200, 0 , getImage("4") )
        .print()
    ,
    newAudio("description", variable.AudioFile)
    ,
    newVar("isEarly", 0)
    ,
    newTooltip("earlyWarning", "STARTED TOO EARLY. You moved your mouse from the Go button before it was possible to guess the correct option. Please don't move your mouse until you're about to click.")
        .settings.position("top center")
    ,
    newVar("slowClick", 0)
    ,
    newTooltip("slowClickWarning", "CLICKED TOO LATE. You took too long to click on your selection. Please try to click faster next time!")
        .settings.position("top center")
    ,
    newTimer(2000) // 2000 ms to preview images
        .start()
        .wait()
    ,
    newButton("Go")
        .print( "center at 50vw" , "center at 90vh" )
        .wait()
        .remove()
    ,
    newTimer("earlyStart", (parseInt(variable.NPTime) - 200) )
    ,
    newTimer("timeLimit", (parseInt(variable.AudioDur) + 1000) )
    ,
    newMouseTracker("mouse")
        .settings.log()
        .settings.callback( getTimer("earlyStart").test.running().success(getVar("isEarly").set(1)) )
        .start()
    ,
    getAudio("description")
        .play()
    ,
    getTimer("earlyStart")
        .start()
    ,
    getTimer("timeLimit")
        .start()
    ,
    newSelector()
        .settings.add( getImage("1") , getImage("2") , getImage("3") , getImage("4"))
        .settings.callback( getTimer("timeLimit").test.ended().success(getVar("slowClick").set(1)) )
        .settings.log()
        .wait()
    ,
    getAudio("description")
       .wait("first")
    ,
    getMouseTracker("mouse")
        .stop()
    ,
    getVar("isEarly")
        .test.is(1).success(getTooltip("earlyWarning").print().wait())
    ,
    getVar("slowClick")
        .test.is(1).success(getTooltip("slowClickWarning").print().wait())
  )
  .log( "ID"     , getVar("ID")    )
  .log( "Group"  , variable.Group  )
  .log( "Label" , variable.Label )
  .log( "Target"   , variable.TargetLocation  )
  .log( "EarlyStartMessage" , getVar("isEarly") )
  .log( "TooSlowMessage" , getVar("slowClick") )
)