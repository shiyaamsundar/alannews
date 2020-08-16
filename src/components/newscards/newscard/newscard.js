import React, { useState, useEffect, createRef } from 'react';
import use from './styles.js'
import classNames from 'classnames'
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core'
const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage,},i,activearticle}) => {
    const classes=use()
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  
    useEffect(() => {
      window.scroll(0, 0);
  
      setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);
  
    useEffect(() => {
      if (i === activearticle && elRefs[activearticle]) {
        scrollToRef(elRefs[activearticle]);
      }
    }, [i, activearticle, elRefs]);
    
    return (
        
        <Card ref={elRefs[i]} className={classNames(classes.card,activearticle===i?classes.activeCard:null)}>
        <CardActionArea href={url} target="_blank">
            <CardMedia className={classes.media} image={urlToImage}/>
            <div classame={classes.details}>
    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
            </div>
    <Typography gutterBottom variant="h5" className={classes.title}>{title}</Typography>
            <CardContent>
    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
    <Button size="small" color="primary" >Learn More</Button>
    <Typography variant="h5" color="textSecondary" >{i+1}</Typography>
        </CardActions>
        </Card>
    )
}

export default NewsCard
