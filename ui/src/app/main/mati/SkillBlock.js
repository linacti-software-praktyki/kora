function SkillBlock({step, title, language}) {

    function getLevel(step) {
        switch (step) {
            case 1:
                return "A1";
            case 2:
                return "A2";
            case 3:
                return "B1";
            case 4:
                return "B2";
            case 5:
                return "C1";
            case 6:
                return "C2";
        }
    }

        return (
            <li class="my-6 px-12 w-[20rem]">
                <div class="space-y-4">
                    <h3>{title}</h3>
                    <hr className="border opacity-20 border-[#111827]"/>
                <div class="flex flex-row items-center">
                    {[...Array(step)].map((e, i) => {
                        return <div class="w-6 h-6 bg-[#111827] rounded-full mt-2 mr-2"></div>
                    })}
                    {[...Array(6 - step)].map((e, i) => {
                        return <div class="w-6 h-6 bg-[#111827] rounded-full mt-2 mr-2 opacity-50"></div>}
                    )
                    }
                    <div class="text-[#111827] text-sm ml-6">{language ? getLevel(step) : step+"/6"}</div>

                </div>
                </div>
            </li>)
}

export default SkillBlock;