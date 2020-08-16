import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import alanBtn from '@alan-ai/alan-sdk-web'
import Cards from './components/newscards/newscards'
import wordsToNumbers from 'words-to-numbers'
import use from './styles.js'
const alankey ='d4babe244fbda30e470c61a8b9ffcb462e956eca572e1d8b807a3e2338fdd0dc/stage'
const alanLogoSrc = 'https://alan.app/voice/images/previews/preview.jpg';
const App=()=>{
    const classes=use()
    const [newsarticels,setnewsarticels]=useState([]);
    const [activearticle,setactivearticle]=useState(-1);
    useEffect(()=>{
        alanBtn({
            key:alankey,
            onCommand:({command,articles,number})=>{
              if(command==='newheadlines')
              {
                
                setnewsarticels(articles)
                setactivearticle(-1)
            }  
              else if(command==='highlight')
              {
                    setactivearticle((prevactiveartice)=>prevactiveartice+1)
              }
              else if(command==='open')
              {
                  const parsednum=number.length>2 ?wordsToNumbers(number,{fuzzy:true}):number;
                  const article=articles[parsednum-1]
                  if(parsednum>20)
                  {
                      alanBtn().playText('please try that again')
                  }
                  else if(article)
                  {
                    window.open(article.url,'_blank')
                    alanBtn().playText('opening....')
                  }

              }
            }
        })
    },[])
    return (
        <div>
               <div className={classes.logoContainer}>
                   <img src='https://alan.app/voice/images/previews/preview.jpg' className={classes.alanLogo} alt="alan logo"/>
                   </div> 
            <Cards articles={newsarticels} activearticle={activearticle}/>
        </div>
    )
}
export default App