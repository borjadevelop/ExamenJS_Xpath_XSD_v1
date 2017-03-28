<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match="/">

<head>
            <title>Book Info</title>
        <style>
                H1 {font-family: Arial,Univers,sans-serif;
                    font-size: 36pt };
                body{
                text-align = center;
                background-image = url("../img/fondomeme.jpg");
                }    
                table {
                background-color = #FFDA5B;                
                border-radius: 5px;
                }

        </style>
    </head>

<html>
 <body>
  <link url="www.privacy.com">
 Read our <b>privacy policy.</b>
</link>
  <h2>Questions</h2>
  <table border="1" >
   <tr bgcolor="#FFDA05">
    <th>Titulo</th>
    <th>Opciones wey</th>
    <th>Respuestas</th>
   </tr>
   <xsl:for-each select="questions/question">
   <tr>
    <td><xsl:value-of select="title"/></td>
   <td>
    <xsl:for-each select="option">
     <xsl:value-of select="position()-1"/>: <xsl:value-of select="text()"/><br/>
    </xsl:for-each>
   </td>
   <td>
    <xsl:for-each select="answer">
     <xsl:value-of select="text()"/><br/>
    </xsl:for-each> 
   </td>
   </tr>
   </xsl:for-each>
  </table>
 </body>
</html>
</xsl:template>

</xsl:stylesheet>