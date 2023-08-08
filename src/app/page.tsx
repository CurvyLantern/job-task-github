"use client";
import { useState } from "react";

const git_api = "https://api.github.com";
const allRepoFetcher = async (accName: string) => {
  const uri = `${git_api}/users/${accName}/repos`;
  const res = await fetch(uri);
  return await res.json();
};
const repoDownloaderUri = ({
  accName,
  repoName,
}: {
  accName: string;
  repoName: string;
}) => `${git_api}/repos/${accName}/${repoName}/zipball`;

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [repoDataArr, setRepoData] = useState<any[]>([]);

  const onSubmit = async () => {
    const data = await allRepoFetcher(inputValue);
    setRepoData(data);
    console.log({ data });
  };

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center">
      <div className="container flex flex-col mt-20 mb-20">
        <h1 className="text-2xl text-white mb-20">
          Hi, if you want to fetch public repositories of a github account ,
          enter the account name below
        </h1>
        <div className="flex flex-col md:flex-row gap-5">
          <input
            className="w-full py-4 px-5 rounded-full text-2xl text-center text-neutral-700 font-bold"
            type="text"
            value={inputValue}
            onChange={(evt) => {
              setInputValue(evt.target.value);
            }}
          />
          <button
            onClick={() => onSubmit()}
            className="px-4 py-2 bg-white text-neutral-900 rounded-full">
            submit
          </button>
        </div>
      </div>

      {/* repos */}

      {repoDataArr.length === 0 ? (
        <p className="text-white">no data to show</p>
      ) : (
        <ul className="flex flex-col gap-2 p-2 w-full">
          {repoDataArr.map((repo) => {
            return (
              <li
                key={repo.id}
                className="shadow-md rounded-md p-4 bg-neutral-200 text-neutral-900 flex items-center justify-between">
                <p>{repo.name}</p>
                <a
                  onClick={() => {
                    repoDownloaderUri({
                      accName: inputValue,
                      repoName: repo.name,
                    });
                  }}
                  className="px-5 py-2 text-white  bg-green-500 rounded-md">
                  download
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
