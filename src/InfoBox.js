import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import "./InfoBox.css";
function InfoBox({title, cases, active, isRecovered = false, total, ...props}) {
    // console.log(isRecovered);
    return(
            <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${active && isRecovered && 'infoBox-green1'} `}>
                <CardContent>
                    {/* Title */}
                    <Typography color="textSecondary" className="infoBox__title">
                        {title}
                    </Typography>   
                    {/*Cases*/}
                    <h2 className={`infoBox__cases ${isRecovered && 'infoBox--green'}`}>{cases}</h2> 
                    {/*Total*/}
                    <Typography color="textSecondary" className="infoBox__total">   
                        Total : {total} 
                    </Typography>    
                </CardContent>
            </Card>
    )
}

export default InfoBox; 