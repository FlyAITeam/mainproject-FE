"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Screen,
  Loading,
  Button,
  DetailButton,
  Input,
  Select,
  Icon,
  Col,
  Row,
  Module,
  PetMap,
} from "@/components";
import { iconRegistry } from "@/components/Icon";

export default function Page() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Screen
      header={{
        title: "Showroom",
        left: {
          icon: "left",
          text: "Home",
          onClick: () => router.replace("/"),
        },
        right: {
          icon: "search",
          text: "Search",
          onClick: () => alert("검색 버튼을 눌렀습니다!"),
        },
      }}
    >
      <div className="w-full h-fit flex flex-col items-center space-y-6 p-4">
        <div className="w-full h-full flex flex-col items-center space-y-4">
          <PreviewBox name="Loading" component={<Loading />} />
          <PreviewBox
            name="Button"
            component={
              <>
                <Button
                  preset="default"
                  onClick={() => alert("버튼1을 눌렀습니다!")}
                >
                  버튼1
                </Button>
                <Button
                  preset="reversed"
                  onClick={() => alert("버튼2을 눌렀습니다!")}
                >
                  버튼2
                </Button>
                <Button disabled>disabled</Button>
              </>
            }
          />
          <PreviewBox
            name="Detail Button"
            component={
              <>
                <DetailButton
                  onClick={() => alert("자세히 버튼을 눌렀습니다!")}
                >
                  자세히
                </DetailButton>
                <DetailButton disabled>disabled</DetailButton>
              </>
            }
          />
          <PreviewBox
            name="Input & Select"
            component={
              <>
                <Input
                  label="Input"
                  placeholder="여기에 입력하세요"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Input
                  label="Input"
                  placeholder="여기에 입력하세요"
                  value={inputValue}
                  onChange={handleInputChange}
                  guideComponent={<Icon icon="search" size={16} />}
                />
                <Select
                  label="Select"
                  placeholder="옵션을 선택하세요"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={[
                    { label: "옵션1", value: "option1" },
                    { label: "옵션2", value: "option2" },
                    { label: "옵션3", value: "option3" },
                  ]}
                />
                <ul className="text-sm">
                  <li>Input value : {inputValue ? inputValue : "없음"}</li>
                  <li>
                    Selected Option : {selectedOption ? selectedOption : "없음"}
                  </li>
                </ul>
              </>
            }
          />
          <PreviewBox
            name="Icon"
            component={
              <>
                {Object.keys(iconRegistry).map((icon) => (
                  <Icon key={icon} icon={icon} />
                ))}
              </>
            }
          />
          <PreviewBox
            name="Col & Row"
            component={
              <>
                <Col className="border" gap="2" padding="2">
                  <div className="bg-green p-4">ColSection1</div>
                  <div className="bg-green p-4">ColSection2</div>
                </Col>
                <Row className="border" gap="2" padding="2">
                  <div className="bg-green p-4">RowSection1</div>
                  <div className="bg-green p-4">RowSection2</div>
                </Row>
              </>
            }
          />
          <PreviewBox
            name="Module"
            component={
              <Module
                title="제목"
                main={
                  <Row className="items-end space-x-4">
                    <div className="bg-green w-32 h-32 rounded-full p-4 flex justify-center items-center">
                      메인
                    </div>
                    <span className="text-[64px] font-bold text-black">
                      99%
                    </span>
                  </Row>
                }
                detail={
                  <Col className="space-y-4">
                    <Row className="items-center space-x-4">
                      <div className="bg-green w-24 h-24 rounded-full p-4 flex justify-center items-center">
                        상세
                      </div>
                      <span className="text-4xl font-bold text-black">99%</span>
                    </Row>
                    <p className="text-sm text-gray-500">
                      상세 내용을 표시하는 부분입니다. 상세 내용을 표시하는
                      부분입니다. 상세 내용을 표시하는 부분입니다. 상세 내용을
                      표시하는 부분입니다. 상세 내용을 표시하는 부분입니다. 상세
                      내용을 표시하는 부분입니다.
                    </p>
                  </Col>
                }
              />
            }
          />
          <PreviewBox name="PetMap" component={<PetMap />} />
        </div>
      </div>
    </Screen>
  );
}

const PreviewBox = ({ name, component }) => {
  return (
    <div className=" w-full h-fit px-4 pt-2 pb-4 bg-gray-200 rounded-lg space-y-2">
      <span className="font-medium">{name}</span>
      <div className="w-full h-fit flex flex-wrap gap-2">{component}</div>
    </div>
  );
};
