import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import Title from "../components/common/Title"
import Animate from "../components/common/AboutScrollAnim"

export default function About() {
    return (
        <Animate>
            <div className="w-100% flex flex-col justify-center items-center flex-1">
                <PageHeader title="About Us" />
                <div className="group relative flex
                                h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
                    <div className="absolute inset-0 flex flex-col
                                    bg-[url('/about/about-us.jpg')] bg-cover bg-center
                                     w-full h-[300px] md:h-[400px] lg:h-[500px]
                                    transition-all duration-500 transform
                                    group-hover:scale-110 group-hover:grayscale">
                        <div className="relative inset-0 flex flex-col
                                        bg-gradient-to-b from-black/90 via-black/50 to-transparent 
                                        w-100% h-[500px] p-[30px] md:p-[60px] lg:p-[120px] text-[20px] 
                                        items-center overflow-auto">
                            {siteConfig.about.paragraphs.map((para, idx) => (
                                <div className="flex flex-col justify-center items-center">
                                    <p key={idx} className="mt-4 text-white group-hover:scale-90 ease-in-out duration-500">{para}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <Title title="About Octagon Precision Mold" />
                <div className="flex flex-col lg:flex-row lg:flex-1
                w-full lg:min-h-[650px]
                bg-[#154A9A] bg-opacity-10
                px-[20px] py-[20px] lg:px-[150px] lg:py-[32px] gap-[16px]
                items-stretch overflow-hidden">
                    <div data-aos="fade-right" data-aos-duration="500" data-aos-delay="100"
                        className="flex flex-col lg:flex-1
                        bg-white rounded shadow
                        items-center">
                        <div className="flex flex-col items-center gap-4 px-[30px] mb-[30px]">
                            <h2 className="text-[24px] md:text-[30px] lg:text-[36px] text-[#4877BE] font-bold text-center">
                                Company Name
                            </h2>
                            <img src="/about/logo.png" alt="Logo" className="w-auto h-[100px] md:h-[150px] lg:h-[200px]" />
                            <p className="text-[24px] md:text-[30px] lg:text-[36px] text-[#4877BE] text-center">
                                Octagon Precision Mold (M) Sdn. Bhd.
                            </p>
                        </div>
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="100"
                        className="flex flex-col lg:flex-1 
                        w-full gap-4
                        items-stretch">
                        <div className="flex flex-col lg:flex-1 h-full gap-4 px-[10px]
                                    bg-white rounded shadow
                                    items-stretch">
                            <h2 className="text-[24px] md:text-[30px] lg:text-[36px] text-[#4877BE] text-center lg:text-left font-bold">Established</h2>
                            <div className="flex justify-center items-center p-6 w-full h-full group-hover:scale-110 ease-in-out duration-500">
                                <span className="text-[50px] md:text-[60px] lg:text-[70px] text-center text-[#4877BE]">2020</span>
                            </div>
                        </div>
                        <div className="group relative flex flex-col lg:flex-1
                                    w-full px-[10px]
                                    bg-white rounded shadow
                                    items-stretch">
                            <h2 className="text-[24px] md:text-[30px] lg:text-[36px] text-[#4877BE] text-center lg:text-left font-bold h-fit">Employees</h2>
                            <div className="flex flex-col justify-center items-center w-full h-full p-6">
                                <p className="text-[50px] md:text-[60px] lg:text-[70px] text-center text-[#4877BE] h-fit group-hover:scale-110 ease-in-out duration-500">7</p>
                                <p className="text-[24px] md:text-[30px] lg:text-[36px] text-center text-[#4877BE] h-fit">Employees</p>
                                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-center text-[#4877BE] h-fit">(including 1 outside Company Director)</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" data-aos-delay="100"
                        className="group relative flex flex-col lg:flex-1
                    w-full
                    bg-white rounded shadow
                    overflow-hidden">
                        <div className="absolute inset-0 z-0 bg-[#96B2DC] translate-y-[-100%] group-hover:translate-y-0 ease-in-out duration-500"></div>
                        <div className="relative z-10">
                            <p className="bg-[#154A9A] text-[24px] md:text-[30px] lg:text-[36px] text-white font-bold p-[8px] text-center">Business Type</p>
                            <p className="bg-[#4877BE] text-[24px] md:text-[30px] lg:text-[36px] text-white p-[8px] text-center">Sales</p>
                            <p className="sm:text-[20px] md:text-[24px] lg:text-[28px] text-[#4877BE] p-[8px] group-hover:text-white ease-in-out duration-500">Automation Solution System Within The Mold,
                                Air/hydraulic booster equipment,
                                Precision metal mold processing and production,
                                Die casting mold non-standard parts processing,
                                Plastic mold non-standard parts processing.</p>
                        </div>
                    </div>
                </div>


                <Title title="Our Office World Network" />
                <div className="relative flex flex-col lg:flex-1
                min-w-[90%] h-full lg:h-[800px]
                justify-center shadow overflow-hidden">
                    <div className="absolute flex justify-center lg:flex-1
                        w-full h-full z-0">
                        <svg viewBox="600 300 1300 300">
                            <image href="https://videos.openai.com/az/vg-assets/task_01kezsxjftf668zf23a8eatk11%2F1768446460_img_0.webp?se=2026-01-19T00%3A00%3A00Z&sp=r&sv=2024-08-04&sr=b&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-01-14T11%3A20%3A38Z&ske=2026-01-21T11%3A25%3A38Z&sks=b&skv=2024-08-04&sig=qE16BPZuj%2BhODLNjwETa6RS0%2BXhTO%2BR3ExzVSeQ3tvA%3D&ac=oaivgprodscus2"
                                x="0" y="0" width="2400" height="1200" />
                            <circle cx="1250" cy="315" r="7" fill="#FF1E1E" stroke="black" stroke-width="1" />
                            <circle cx="1310" cy="330" r="7" fill="#FFBD76" stroke="black" stroke-width="1" />
                            <circle cx="1195" cy="705" r="7" fill="#EEE45A" stroke="black" stroke-width="1" />
                            <circle cx="1115" cy="600" r="7" fill="#76FF86" stroke="black" stroke-width="1" />
                            <circle cx="1070" cy="560" r="7" fill="#B0BDFF" stroke="black" stroke-width="1" />
                        </svg>
                    </div>
                    <div className="relative flex w-full h-full">
                        <div className="relative flex flex-col items-center
                        w-[25%] h-[600px] z-10 py-[100px] opacity-0">
                            <div data-aos="fade-right" data-aos-duration="500">
                                <div className="flex flex-col bg-white rounded shadow transform transition-transform p-[10px] h-fit mb-[50px] hover:scale-105 ease-in-out duration-500">
                                    <p className="text-[18px] font-bold">Malaysia Branch</p>
                                    <p className="text-[15px]">No.70-3-26, D’PIAZZA MALL, JALAN MAHSURI, 11900, BAYAN LEPAS, PENANG, MALAYSIA</p>
                                </div>
                            </div>
                            <div data-aos="fade-right" data-aos-duration="500" className="flex flex-col items-center h-full">
                                <div className="flex flex-col bg-white rounded shadow transform transition-transform p-[10px] h-[100px] mb-[50px] mt-[150px] hover:scale-105 ease-in-out duration-500">
                                    <p className="text-[18px] font-bold">Singapore Branch</p>
                                    <p className="text-[15px]">No.68 Circular Road #02-01. Singapore 049422</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center 
                        w-[25%] h-[600px] z-10
                        py-[100px] opacity-0">
                            <div data-aos="fade-left" data-aos-duration="500">
                                <div className="flex flex-col bg-white rounded shadow transform transition-transform p-[10px] h-fit mb-[50px] hover:scale-105 ease-in-out duration-500">
                                    <p className="text-[18px] font-bold">China Head Office</p>
                                    <p className="text-[15px]">No.51, Shayong Road, Shatou Community, Dongguan City</p>
                                </div>

                            </div>
                            <div data-aos="fade-left" data-aos-duration="500">
                                <div className="flex flex-col bg-white rounded shadow transform transition-transform p-[10px] h-fit mb-[50px] mt-[20px] hover:scale-105 ease-in-out duration-500">
                                    <p className="text-[18px] font-bold">Taiwan Head Office</p>
                                    <p className="text-[15px]">No.5F, No.31, Ln. 71, Zhengguang 2nd St. Taoyuan Dist. Taoyuan City</p>
                                </div>
                            </div>
                            <div data-aos="fade-left" data-aos-duration="500">
                                <div className="flex flex-col bg-white rounded shadow transform transition-transform p-[10px] h-fit mb-[50px] mt-[20px] hover:scale-105 ease-in-out duration-500">
                                    <p className="text-[18px] font-bold">Indonesia Branch Company</p>
                                    <p className="text-[15px]">No.B27 Ruko CosmoJi, Tangkuban Perahu. Elysium, Lippo Cikarang</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <Title title="Our Clients & Partners" />
                <div className="relative flex flex-col justify-center items-center 
                w-full h-[600px] gap-[10px]
                bg-[#154A9A] bg-opacity-10 overflow-hidden">
                    <div data-aos="fade-left" data-aos-delay="100" className="relative flex justify-center items-center gap-[10px]">
                        <img src="/about/knights-engineering-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/q-plas-logo.webp" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/class-A-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/exceptional-mould-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/hp-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                    </div>
                    <div data-aos="fade-right" data-aos-delay="100" className="relative flex justify-center items-center gap-[10px]">
                        <img src="/about/meHow-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/Nationgate-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/Modernria-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/Meiban-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                        <img src="/about/IMR-logo.png" className="w=[240px] h-[240px] bg-white rounded shadow hover:scale-105 ease-in-out duration-500" />
                    </div>
                </div>
            </div>
        </Animate >
    )
}
