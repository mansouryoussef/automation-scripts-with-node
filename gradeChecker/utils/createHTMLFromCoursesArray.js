module.exports = coursesArray =>
	`
<h4>Course changes:</h4>
<ul>
    ${coursesArray.map(course => {
			return `
        <li>
            <b>Name:</b> ${course.name}
        </li>
        <li>
            <b>Scope:</b> ${course.scope} 
        </li>
        <li>
            <b>Grade:</b> ${course.grade}
        </li>
        <br/>
        `;
		})}
</ul>
`.replace(',', '');
