const Task = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">Tasks</h1>
      <p>
        <h2 className="text-2xl font-bold">Acceptance Criteria:</h2>
        The application should pull images for the following dates by reading from a text file:
        <ul className="pl-6 list-disc">
          <li> 02/27/17</li>
          <li>June 2, 2018</li>
          <li>Jul-13-2016</li>
          <li>April 31, 2018</li>
        </ul>
        The code must be written in TypeScript using Node.js or another server-side JavaScript runtime.
        We should be able to build and run the project locally after submission.
        Include all relevant documentation (e.g., a README file) in the repository.

        <h2 className="pt-4 text-2xl font-bold">Bonus:</h2>
        Bonus 1: Display the images in a web browser using React or Svelte.
        Bonus 2: Include unit tests, static analysis, performance tests, or any other best practices that align with the definition of "Done."
        Bonus 3: Have the application run in Docker.
      </p>
    </div>
  );
};

export default Task; 