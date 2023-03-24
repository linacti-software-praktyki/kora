import EducationBlock from "./EducationBlock";
import SkillBlock from "./SkillBlock";

function MatiContent() {
    return (
        <div>
            <h1 class="font-semibold py-16 text-[#111827]">Mateusz</h1>
            <div className="border-l-2 pl-20 space-y-20">
                <div>
            <h2 class="font-medium mb-12 mb-12">Info</h2>
            <ul class="list-disc ml-24">
                <li><b>Date of birth:</b>01.01.2000</li>
                <br/>
                <li><b>Email:</b> <a href="">Example Mail</a></li>
                <br/>
                <li><b>Phone:</b> 123456789</li>
                <br/>
                <li><b>Nationality:</b> Polish</li>
            </ul></div>
            <div>
            <h2 class="font-medium mb-12">About Me</h2>
            <p class="ml-12">
                I have started programming in primary school. Since then I have learned many programming languages for
                instance: HTML, CSS, PHP, Python, Java, Javascript, SQL. Using those languages I have created many
                projects from simple websites to complex problem solving programs. My favourite programming language is
                Javascript which I use in every project. Right now I learning frameworks to enhance the quality of my
                projects. My other hobbies are playing video games, drawing and listening to music. Video games gives me
                inspiration and an opportunity to figure out how game mechanics are made, drawing helps me with
                creativity and music is important factor to focus when I am coding.
            </p></div><div>
            <h2 class="font-medium mb-12">Education</h2>
            <p>
                <ul class="list-disc ml-24">
                    <EducationBlock title={"Javascript programming course"}>
                        <p>Cisco</p>
                        <p>
                            08/02/2023 - Current
                        </p>
                        <p>
                            Kielce
                        </p><a>https://www.netacad.com/</a>
                    </EducationBlock>
                    <EducationBlock title={"INF.04. Designing, programming and testing applications."}>
                        <p>Zespół Szkół Informatyczych im. gen. Hauke Bosaka w Kielcach (IT Technical College)</p>
                        <p>
                            31/08/2020 - Current
                        </p>
                        <p>
                            Warszawska 96, 25-401, Kielce, Poland
                        </p><a>https://www.zsi.kielce.pl/</a>
                    </EducationBlock>

                    <EducationBlock
                        title={"INF.03. Creation and administration of websites, databases and website applications."}>
                        <p>Zespół
                            Szkół Informatyczych im. gen. Hauke Bosaka w Kielcach (IT Technical College)</p>
                        <p>
                            31/08/2020 - Current
                        </p>
                        <p>
                            Warszawska 96, 25-401, Kielce, Poland
                        </p><a>https://www.zsi.kielce.pl/</a>
                    </EducationBlock>
                </ul>
            </p></div><div>
            <h2 className="font-medium mb-12 ">Skills</h2>
            <p class="flex justify-around">

                <h3 className="font-medium mb-12 py-12">Digital Skills</h3>

                <h3 className="font-medium mb-12 py-12">English</h3>

                <h3 className="font-medium mb-12 py-12">German</h3>
            </p>
            <p class="flex justify-around">
                <ul class="ml-24 border-l w-min h-min flex items-center justify-center flex-col border-[#111827]">
                    <SkillBlock step={6} title={"HTML"}/>
                    <SkillBlock step={6} title={"CSS"}/>
                    <SkillBlock step={4} title={"PHP"}/>
                    <SkillBlock step={4} title={"Python"}/>
                    <SkillBlock step={3} title={"Java"}/>
                    <SkillBlock step={5} title={"Javascript"}/>
                    <SkillBlock step={4} title={"SQL"}/>
                </ul>
                <ul className=" ml-24 border-l m-min h-min  flex items-center justify-center flex-col border-[#111827]">
                    <SkillBlock step={4} title={"Listening"} language/>
                    <SkillBlock step={4} title={"Reading"} language/>
                    <SkillBlock step={4} title={"Spoken interaction"} language/>
                    <SkillBlock step={4} title={"Spoken production"} language/>
                    <SkillBlock step={4} title={"Writing"} language/>
                </ul>
                <ul className=" ml-24 border-l w-min h-min  flex items-center justify-center flex-col border-[#111827]">
                    <SkillBlock step={2} title={"Listening"} language/>
                    <SkillBlock step={2} title={"Reading"} language/>
                    <SkillBlock step={2} title={"Spoken interaction"} language/>
                    <SkillBlock step={2} title={"Spoken production"} language/>
                    <SkillBlock step={3} title={"Writing"} language/>
                </ul>
            </p></div>
        </div></div>
    )
}

export default MatiContent;
