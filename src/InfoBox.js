import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

function InfoBox({title, cases, total}) {
    return(
        <div>
            <Card>
                <CardContent>
                    {/* Title */}
                    <Typography color="textSecondary" className="infoBox__title">
                        {title}
                    </Typography>   
                    {/*Cases*/}
                    <h2 className="infoBox__cases">{cases}</h2> 
                    {/*Total*/}
                    <Typography color="textSecondary" className="infoBox__total">   
                        {total}
                    </Typography>    
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox; 